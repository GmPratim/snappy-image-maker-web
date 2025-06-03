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
  };

  const handleInputChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleResize = async () => {
    setError('');
    if (!file) {
      setError('Please upload an image.');
      return;
    }
    if (!targetSize || isNaN(targetSize) || targetSize < 5) {
      setError('Enter a valid target size (min 5 KB).');
      return;
    }
    setLoading(true);
    try {
      const options = {
        maxSizeMB: targetSize / 1024, // targetSize is in KB
        maxWidthOrHeight: 2000, // optional, keep large enough
        useWebWorker: true,
        fileType: file.type,
        initialQuality: 0.8,
      };
      const compressedFile = await imageCompression(file, options);
      setResizedFile(compressedFile);
    } catch (err) {
      setError('Failed to resize image.');
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
          className={`border-2 border-dashed rounded-xl p-6 text-center mb-4 cursor-pointer ${file ? 'border-green-600' : 'border-purple-400'} bg-gray-100`}
          onClick={() => inputRef.current.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {!file ? (
            <>
              <div className="text-gray-900 mb-2 font-medium">Drag & drop or click to upload</div>
              <div className="text-xs text-purple-700">(JPEG, JPG, PNG, max 10MB)</div>
            </>
          ) : null}
          <input
            type="file"
            accept="image/jpeg,image/jpg,image/png"
            className="hidden"
            ref={inputRef}
            onChange={handleInputChange}
          />
        </div>
        {file && !resizedFile && (
          <div className="mb-2 text-sm text-gray-600">Original size: {formatBytes(file.size)}</div>
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
          <div className="flex flex-col md:flex-row gap-4 mt-4 items-center justify-center">
            <div className="flex-1 text-center">
              <div className="font-semibold text-gray-700 mb-1">Original</div>
              <img
                src={preview}
                alt="Original Preview"
                className="mx-auto max-h-40 mb-2 rounded-lg border"
              />
              <div className="mb-2 text-xs text-gray-600">{formatBytes(file.size)}</div>
            </div>
            <div className="flex-1 text-center">
              <div className="font-semibold text-gray-700 mb-1">Resized</div>
              <img
                src={URL.createObjectURL(resizedFile)}
                alt="Resized Preview"
                className="mx-auto max-h-40 mb-2 rounded-lg border"
              />
              <div className="mb-2 text-xs text-gray-600">{formatBytes(resizedFile.size)}</div>
              <a
                href={URL.createObjectURL(resizedFile)}
                download={`resized-${file.name}`}
                className="inline-block bg-cyan-600 text-white px-6 py-2 rounded-lg font-semibold shadow hover:bg-cyan-700 transition mb-2"
              >
                Download Image
              </a>
              <button onClick={handleRemove} className="block mx-auto mt-2 text-xs text-gray-400 hover:text-gray-700">Remove & start over</button>
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