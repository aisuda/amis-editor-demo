import React from 'react';
import {Link} from 'react-router-dom';
import {NotFound} from 'amis';

export default () => (
  <NotFound
    links={
      <Link to="/" className="list-group-item">
        <i className="fa fa-chevron-right text-muted" />
        <i className="fa fa-fw fa-mail-forward m-r-xs" />
        去首页
      </Link>
    }
    footerText={''}
  />
);
