import { RiseLoader } from 'react-spinners';

export const Loader = () => (
  <RiseLoader
    color="#004386"
    margin={8}
    size={20}
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 13000,
    }}
  />
);
