"use client";

import React, { useState, useEffect } from 'react';
import { Input } from '@headlessui/react';
import { useCookies } from 'react-cookie';
import Head from 'next/head';

interface StringDissectorProps {}

const StringDissector: React.FC<StringDissectorProps> = () => {
  const [text, setText] = useState('');
  const [persistData, setPersistData] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['userText']);

  useEffect(() => {
    const storedText = cookies['userText'];
    if (storedText) {
      setText(storedText);
      setPersistData(true);
    }
  }, [cookies]);

  useEffect(() => {
    if (persistData) {
      setCookie('userText', text, { path: '/', maxAge: 3600 * 24 * 30 }); // 30 days expiry
    } else {
      removeCookie('userText');
    }
  }, [persistData, text, setCookie, removeCookie]);

  const characterList = text.split('').map((char, index) => char);

  const currentYear = new Date().getFullYear();

  return (
    <div className="container mx-auto min-h-screen flex flex-col">
      <Head>
        <title>String Dissector</title>
        <meta name="description" content="Break down a string into individual characters" />
      </Head>
      <header className="bg-white p-4">
        <h1 className="text-2xl font-bold">String Dissector</h1>
      </header>
      <main className="flex-grow p-4">
        <div className="flex items-center mb-2">
          <label htmlFor="input" className="text-gray-700 font-bold mr-2">
            Enter string:
          </label>
          <Input
            id="input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="border-gray-300 focus:border-indigo-500 rounded-md p-2 w-full"
            placeholder="Enter your string here"
          />
        </div>
        <div className="flex items-center">
          <input type="checkbox" checked={persistData} onChange={() => setPersistData(!persistData)} className="mr-2" />
          <label htmlFor="persist" className="text-gray-700">Persist data</label>
        </div>
        {text ? (
          <ol className="mt-4 list-disc">
            {characterList.map((char, index) => (
              <li key={index} className="text-gray-700">{char}</li>
            ))}
          </ol>
        ) : (
          <p>Please enter a string to see the character list</p>
        )}
      </main>
      <footer className="bg-white p-4">
        <p>© Arnab Sen {currentYear}</p>
      </footer>
    </div>
  );
};

export default StringDissector;