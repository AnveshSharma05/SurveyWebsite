"use client";
import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import {csvData} from '../../../features/tableDataSlice';
import { useSelector, useDispatch } from 'react-redux';


const UploadCSVButton = ({onSendData}) => {
  const dispatch = useDispatch()

  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);


const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      console.log('Parsed Data:', jsonData);

      setData(jsonData);
      dispatch(csvData(jsonData))

      if (jsonData.length > 0) {
        setHeaders(Object.keys(jsonData[0]));
      }
    };
    reader.readAsBinaryString(file);
  };

  return (
    <>
    {/* Dropzone view */}
    <div className={`flex items-center justify-center w-full mb-4 ${data.length > 0 ? 'hidden' : 'flex'}`}>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            CSV, XLSX (MAX. 2 MB)
          </p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" accept=".csv,.xlsx" onChange={handleFileUpload} />
      </label>
    </div>
   
   {/* Button view */}
    <div className={`mt-2 w-[300px] ${data.length > 0 ? '' : 'hidden'}`}>
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center cursor-pointer w-[300px] py-1 bg-sky-700 hover:bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out"
      >
        Upload CSV
        <input id="dropzone-file" type="file" className="hidden" accept=".csv,.xlsx" onChange={handleFileUpload} />
      </label>
    </div>
<div>
   
</div>    
    </>
  );
}

export default UploadCSVButton;

