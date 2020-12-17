import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', textAlign: 'center', paddingBottom: '15px' };
    return (
        <footer style={{ bottom: '0', position: 'relative', width: '100vw' }}>
          <div style={divStyle}>
            <hr />
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
            <a href="https://study-ext.github.io/">GitHub Page</a>
          </div>
        </footer>
    );
  }
}

export default Footer;
