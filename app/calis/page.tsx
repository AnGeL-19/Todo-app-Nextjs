'use client'
import Board from '@/components/Board';
import React, {Suspense, useState} from 'react';




function App() {

 

  return (
    <div className="p-5">
      
      <Suspense fallback={<span>Loading...</span>}>
        <Board/>
      </Suspense>
      
    </div>
  );
  // 
  
};


export default App