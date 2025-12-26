import React, { useRef } from 'react';
import { Upload, X, FileText, Image as ImageIcon } from 'lucide-react';

const FileUpload = ({
    onFileSelect,
    accept = "*/*",
    multiple = false,
    maxSize = 10 * 1024 * 1024, // 10MB por defecto
    label = "Subir archivos"
}) => {
    const [files, setFiles] = React.useState([]);
    const [dragActive, setDragActive] = React.useState(false);
    const inputRef = useRef(null);

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFiles(e.dataTransfer.files);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFiles(e.target.files);
        }
    };

    const handleFiles = (fileList) => {
        const newFiles = Array.from(fileList).filter(file => {
            if (file.size > maxSize) {
                alert(`El archivo ${file.name} excede el tamaño máximo de ${maxSize / 1024 / 1024}MB`);
                return false;
            }
            return true;
        });

        const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
        setFiles(updatedFiles);
        onFileSelect(updatedFiles);
    };

    const removeFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
        onFileSelect(updatedFiles);
    };

    const getFileIcon = (file) => {
        if (file.type.startsWith('image/')) {
            return <ImageIcon className="w-8 h-8 text-blue-500" />;
        }
        return <FileText className="w-8 h-8 text-gray-500" />;
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    };

    return (
        <div className="space-y-4">
            {/* Zona de drop */}
            <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current?.click()}
                className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
          ${dragActive
                        ? 'border-pink-500 bg-pink-50'
                        : 'border-gray-300 hover:border-pink-400 hover:bg-gray-50'
                    }
        `}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleChange}
                    className="hidden"
                />

                <Upload className={`
          w-12 h-12 mx-auto mb-4
          ${dragActive ? 'text-pink-500' : 'text-gray-400'}
        `} />

                <p className="text-sm font-medium text-gray-700 mb-1">
                    {label}
                </p>
                <p className="text-xs text-gray-500">
                    Arrastra archivos aquí o haz clic para seleccionar
                </p>
                <p className="text-xs text-gray-400 mt-2">
                    Tamaño máximo: {maxSize / 1024 / 1024}MB
                </p>
            </div>

            {/* Lista de archivos */}
            {files.length > 0 && (
                <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">
                        Archivos seleccionados ({files.length})
                    </p>
                    {files.map((file, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                        >
                            {getFileIcon(file)}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-700 truncate">
                                    {file.name}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {formatFileSize(file.size)}
                                </p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(index);
                                }}
                                className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FileUpload;
