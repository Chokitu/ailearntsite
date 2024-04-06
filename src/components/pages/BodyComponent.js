import React from 'react';


const BodyComponent = ({ body }) => {
  const bodyContent = JSON.parse(body);
  return (
    <div>
      {bodyContent.map((item, index) => (
        <p key={index} style={item.Style}>{item.Text}</p>
      ))}
    </div>
  );
};



export default BodyComponent;