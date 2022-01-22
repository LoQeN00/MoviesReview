import React ,{FC} from 'react';

const Layout: FC = ({children}) => {
  return (
    <div className='root'>
        {children}
    </div>
  );
};

export default Layout;
