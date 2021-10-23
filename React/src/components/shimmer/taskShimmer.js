import React from 'react';

const TaskShimmer = () => {
  return (
    <div className='task'>
      <div>
        <h3 className='skeleton skeleton-text' style={{ height: '15px' }}></h3>
        <p className='skeleton skeleton-text' style={{ height: '20px', width: '100%' }}></p>
      </div>
    </div>
  );
};

export default TaskShimmer;
