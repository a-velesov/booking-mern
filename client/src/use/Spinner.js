import { Spin } from 'antd';

const Spinner = () => {
  return (
    <div style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      zIndex: 2,
    }}
    >
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      >
        <Spin tip="Loading..." size='large' />
      </div>
    </div>
  );
};

export default Spinner;