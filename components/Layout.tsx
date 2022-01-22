import React ,{FC} from 'react';
import Header from './Header';

const Layout: FC = ({children}) => {
  return (
    <div className='root'>
        <Header />
        {children}
    </div>
  );
};

export default Layout;
