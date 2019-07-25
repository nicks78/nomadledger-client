import React from 'react';
import packageJson from '../package.json';
global.appVersion = packageJson.version;



// version from `meta.json` - first param
// version in bundle file - second param
const semverGreaterThan = (versionA, versionB) => {
  const versionsA = versionA.split(/\./g);

  const versionsB = versionB.split(/\./g);
  while (versionsA.length || versionsB.length) {
    const a = Number(versionsA.shift());

    const b = Number(versionsB.shift());

    if (a === b) continue;

    return a > b || isNaN(b);
  }
  return false;
};

class CacheBuster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      isLatestVersion: false,
      reloadedAt: null,
      refreshCacheAndReload: () => {
        // console.log('Clearing cache and hard reloading...')
        // if (caches) {
        //   // Service worker cache should be cleared with caches.delete()
        //   caches.keys().then(function(names) {
        //     for (let name of names) caches.delete(name);
        //   });
        // }

        // // delete browser cache and hard reload
        // window.location.reload(true);
        
      }
    };
  }

  componentDidMount() {
    console.log("componentDidMount - new update = " + new Date())
    fetch('/meta.json')
      .then((response) => response.json())
      .then((meta) => {
        const latestVersion = meta.version;
       
        const currentVersion = global.appVersion;

        const shouldForceRefresh = semverGreaterThan(latestVersion, currentVersion);
        if (shouldForceRefresh ) {
          console.log(`We have a new version - ${latestVersion}. Should force refresh`);
          this.setState({ loading: false, isLatestVersion: false });
        } else {
          console.log(`You already have the latest version - ${latestVersion}. No cache refresh needed.`);
          this.setState({ loading: false, isLatestVersion: true });
        }
      });
  }
  render() {
    const { loading, isLatestVersion, refreshCacheAndReload } = this.state;
    return this.props.children({ loading, isLatestVersion, refreshCacheAndReload });
  }
}

export default CacheBuster;
