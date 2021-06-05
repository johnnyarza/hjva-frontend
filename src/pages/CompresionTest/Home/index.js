import React, { useState } from 'react';

import SideBar from '../../../components/SideBar';

import CompressionTest from '../CompressionTest';
import ConcreteSample from '../ConcreteSample';

function CompresionTestHome() {
  const [currentCompressionTest, setCurrentCompressionTest] = useState(null);

  const handleViewCompressionTest = (compressionTest) => {
    setCurrentCompressionTest(compressionTest);
  };
  return (
    <>
      <SideBar />
      {currentCompressionTest ? (
        <ConcreteSample
          handleBackClick={() => setCurrentCompressionTest(null)}
          compressionTest={currentCompressionTest}
        />
      ) : (
        <CompressionTest
          handleViewCompressionTest={handleViewCompressionTest}
        />
      )}
    </>
  );
}

export default CompresionTestHome;
