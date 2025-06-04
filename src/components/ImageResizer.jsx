import React, { useRef, useState } from 'react';
import imageCompression from 'browser-image-compression';

const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];
const MAX_FILE_SIZE_MB = 10;

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

const ImageResizer = ({ onClose }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [targetSize, setTargetSize] = useState('');
  const [resizedFile, setResizedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef();
  const originalImageDimensions = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (file) => {
    setError('');
    if (!file) return;
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError('Only JPEG, JPG, and PNG files are allowed.');
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError('File is too large. Max 10MB allowed.');
      return;
    }
    setFile(file);
    setPreview(URL.createObjectURL(file));
    setResizedFile(null);

    // Read dimensions to use for scaling later
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        originalImageDimensions.current = { width: img.width, height: img.height };
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleResize = async () => {
    setError(''); // Clear previous errors
    if (!file) {
      setError('Please upload an image.');
      return;
    }
    if (!targetSize || isNaN(targetSize) || parseInt(targetSize, 10) < 1) {
      setError('Enter a valid target size (min 1 KB).'); // Adjusted min size check to 1 KB
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('targetSizeKB', targetSize);

    try {
      // Send image and target size to the backend for resizing
      const response = await fetch('http://localhost:5000/api/resize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        // Handle server errors
        const errorData = await response.json();
        throw new Error(errorData.error || 'Server error during resizing.');
      }

      // Server sent back the resized image buffer
      const resizedImageBlob = await response.blob();
      // Create a File-like object from the Blob to store size
      const resizedFileObject = new File([resizedImageBlob], file.name, { type: resizedImageBlob.type });

      setResizedFile(resizedFileObject);
      // No quality warning needed here, as server handles accuracy

    } catch (err) {
      console.error('Resize request error:', err);
      setError(err.message || 'Failed to resize image.');
    }
    setLoading(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleRemove = () => {
    setFile(null);
    setPreview(null);
    setResizedFile(null);
    setError('');
    setTargetSize('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="bg-white border-2 border-purple-700 shadow-2xl shadow-black/30 p-8 w-full max-w-md relative rounded-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl">&times;</button>
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Resize Your Image</h2>
        <div
          className={`border-2 border-dashed rounded-xl p-3 text-center mb-4 cursor-pointer flex items-center ${file ? 'border-green-600' : 'border-purple-400'} bg-gray-100`}
          onClick={() => inputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <span className="mr-3 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2zm0 0l7 7 4-4 5 5" />
            </svg>
          </span>
          <span className="flex-1 text-center font-medium text-gray-700 truncate">
            {file ? file.name : "Drag & drop or click to upload"}
          </span>
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            className="hidden"
            ref={inputRef}
            onChange={handleInputChange}
          />
        </div>
        {file && !resizedFile && (
          <div className="mb-2 text-sm font-semibold text-white">Original size: {formatBytes(file.size)}</div>
        )}
        <div className="mb-4">
          <input
            type="number"
            min="5"
            placeholder="Target size (KB)"
            className="w-full border rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={targetSize}
            onChange={e => setTargetSize(e.target.value)}
            disabled={loading}
          />
        </div>
        {error && <div className="mb-2 text-red-500 text-sm text-center">{error}</div>}
        {!resizedFile && (
          <button
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold mb-4 disabled:opacity-60"
            onClick={handleResize}
            disabled={loading || !file || !targetSize}
          >
            {loading ? (
              <span className="flex items-center justify-center"><span className="loader mr-2"></span>Resizing...</span>
            ) : (
              'Resize Image'
            )}
          </button>
        )}
        {/* Side-by-side preview after resize */}
        {resizedFile && (
          <div className="w-full flex flex-col items-center justify-center mt-6">
            <div className="flex flex-row gap-8 items-end justify-center w-full">
              <div className="flex flex-col items-center">
                <div className="text-lg font-bold text-white mb-2 tracking-wide uppercase drop-shadow">Original</div>
                <img
                  src={preview}
                  alt="Original Preview"
                  className="mb-2 rounded-xl border-2 border-blue-200 shadow-lg object-cover"
                  style={{ width: '200px', height: '280px' }}
                />
                <div className="mb-2 text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full shadow text-center w-full text-white">{formatBytes(file.size)}</div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-lg font-bold text-white mb-2 tracking-wide uppercase drop-shadow">Resized</div>
                <img
                  src={URL.createObjectURL(resizedFile)}
                  alt="Resized Preview"
                  className="mb-2 rounded-xl border-2 border-green-200 shadow-lg object-cover"
                  style={{ width: '200px', height: '280px' }}
                />
                <div className="mb-2 text-sm font-semibold text-green-700 bg-green-50 px-3 py-1 rounded-full shadow text-center w-full text-white">{formatBytes(resizedFile.size)}</div>
              </div>
            </div>
            <div className="flex flex-row items-center justify-center gap-10 w-full mt-6">
              <button
                onClick={handleRemove}
                className="text-xs font-semibold text-white bg-pink-600 px-4 py-2 rounded-lg shadow hover:bg-pink-700 transition"
                style={{ minWidth: '140px' }}
              >
                Remove & start over
              </button>
              <a
                href={URL.createObjectURL(resizedFile)}
                download={`resized-${file.name}`}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:from-purple-700 hover:to-pink-700 transition text-base border-0 focus:outline-none focus:ring-2 focus:ring-purple-400"
                style={{ minWidth: '180px', justifyContent: 'center' }}
              >
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'><path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4' /></svg>
                Download Image
              </a>
            </div>
          </div>
        )}
        <style>{`
          .loader {
            border: 3px solid #f3f3f3;
            border-top: 3px solid #a21caf;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            animation: spin 1s linear infinite;
            display: inline-block;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default ImageResizer; 