import React from 'react';
// TIS PAGE WILL CATCH ALL DYNAMIC ROUTES /posts/1/2/3/4 (use ... in folder structure)
const TestAllRoutes = ({ params }) => {
    console.log(params)
  return (
    <div>This page is to catch all routes</div>
  )
}

export default TestAllRoutes