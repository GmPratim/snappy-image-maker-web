const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');

const app = express();
app.use(cors()); // Allows cross-origin requests from your frontend

const upload = multer({ storage: multer.memoryStorage() }); // Store uploaded files in memory

app.post('/api/resize', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
        return res.status(400).json({ error: 'No image file uploaded.' });
    }
    if (!req.body.targetSizeKB) {
        return res.status(400).json({ error: 'Target size in KB is required.' });
    }

    const targetSizeKB = parseInt(req.body.targetSizeKB, 10);
    if (isNaN(targetSizeKB) || targetSizeKB < 1) {
         return res.status(400).json({ error: 'Invalid target size provided.' });
    }

    const imageBuffer = req.file.buffer;
    const targetBytes = targetSizeKB * 1024;

    let metadata = await sharp(imageBuffer).metadata();
    let originalWidth = metadata.width;
    let originalHeight = metadata.height;

    let bestBuf = null;
    let bestDiff = Infinity;
    let finalQuality = 80; // Default quality if no better is found
    let finalWidth = originalWidth;

    // Iterate through a range of potential target widths (scales)
    // Start from original width down to a minimum reasonable size
    const scaleSteps = 20; // Number of different widths to try
    const minWidth = Math.max(10, Math.round(originalWidth * 0.1)); // Don't go below 10px or 10%

    for (let i = 0; i <= scaleSteps; i++) {
        const targetWidth = Math.max(minWidth, Math.round(originalWidth * (1.0 - (i / scaleSteps) * 0.9))); // Scale from 100% down to 10%

        // Binary search for the best quality at this target width
        let minQ = 10;
        let maxQ = 100;
        let currentBestBufAtScale = null;
        let currentBestDiffAtScale = Infinity;
        let currentBestQAtScale = 80;
        let qualityIterations = 0;
        const maxQualityIterations = 12; // Limit quality search iterations

        while(minQ <= maxQ && qualityIterations < maxQualityIterations) {
            const q = Math.round((minQ + maxQ) / 2);
            let pipeline = sharp(imageBuffer).resize({ width: targetWidth, height: Math.round(originalHeight * (targetWidth / originalWidth)) }); // Maintain aspect ratio

            // Handle transparency for JPEG output
            if (metadata.hasAlpha && req.file.mimetype !== 'image/png') { // Only flatten if converting from alpha (like PNG) to JPEG
              pipeline = pipeline.flatten({ background: { r: 255, g: 255, b: 255 } });
            }

            // Determine output format - default to jpeg, but handle png if original was png and no alpha flattening
             let outputFormat = 'jpeg';
             if (req.file.mimetype === 'image/png' && !metadata.hasAlpha) {
                 outputFormat = 'png'; // Keep as PNG if original was PNG and no transparency issues
             }

            const buf = await pipeline[outputFormat]({ quality: q }).toBuffer();
            const diff = Math.abs(buf.length - targetBytes);

            if (diff < currentBestDiffAtScale) {
                currentBestDiffAtScale = diff;
                currentBestBufAtScale = buf;
                currentBestQAtScale = q;
            }

            // Binary search logic based on buffer size
            if (buf.length > targetBytes) {
              maxQ = q - 1;
            } else if (buf.length < targetBytes) {
              minQ = q + 1;
            } else {
                // Found exact match - prioritize this
                currentBestBufAtScale = buf;
                currentBestDiffAtScale = 0;
                currentBestQAtScale = q;
                break; // Exact match, stop quality search for this width
            }
            qualityIterations++;
        }

        // After binary search for this width, check if it's the overall best result found so far
        // Prioritize being under or very close to the target
        if (currentBestBufAtScale) {
            const currentOverallDiff = Math.abs(currentBestBufAtScale.length - targetBytes);

            // Prioritize results that are closer to the target
            if (currentOverallDiff < bestDiff) {
                bestDiff = currentOverallDiff;
                bestBuf = currentBestBufAtScale;
                finalQuality = currentBestQAtScale;
                finalWidth = targetWidth;
            }
             // If we find a result very close to the target (within 1KB), we can potentially stop iterating through scales early
             if (bestDiff <= 1024 && bestBuf.length <= targetBytes) { // Stop if we have a good result under target
                  break; 
             }
        }
    }

     // If after all attempts we still don't have a result, something went wrong or target is impossible
     if (!bestBuf) {
          // As a fallback, try compressing the original at a low quality
          try {
               let fallbackQuality = 50; // Start with a moderate fallback quality
                let pipeline = sharp(imageBuffer).resize({ width: originalWidth, height: originalHeight });
                if (metadata.hasAlpha && req.file.mimetype !== 'image/png') {
                     pipeline = pipeline.flatten({ background: { r: 255, g: 255, b: 255 } });
                }
                let outputFormat = 'jpeg';
                if (req.file.mimetype === 'image/png' && !metadata.hasAlpha) {
                    outputFormat = 'png';
                }
               bestBuf = await pipeline[outputFormat]({ quality: fallbackQuality }).toBuffer();
               // If still too big, try a lower quality until it fits or quality is too low
               while (bestBuf.length > targetBytes && fallbackQuality > 10) {
                   fallbackQuality -= 5;
                   bestBuf = await pipeline[outputFormat]({ quality: fallbackQuality }).toBuffer();
               }
               if (bestBuf.length > targetBytes) { // If even low quality doesn't fit
                   return res.status(400).json({ error: 'Target size too small for this image.' });
               }
          } catch (fallbackErr) {
               console.error('Fallback compression error:', fallbackErr);
               return res.status(500).json({ error: 'Image processing failed after primary attempts.' });
          }
     }

    // Set content type based on the output format
    const finalMetadata = await sharp(bestBuf).metadata();
    let contentType = 'image/jpeg'; // Default
    if (finalMetadata.format === 'png') {
        contentType = 'image/png';
    } else if (finalMetadata.format === 'webp') {
        contentType = 'image/webp';
    } // Add other formats if needed

    res.set('Content-Type', contentType);
    res.send(bestBuf);

  } catch (err) {
    console.error('Image processing error:', err);
    res.status(500).json({ error: 'Image processing failed.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 