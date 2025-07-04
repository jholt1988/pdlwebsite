import React from 'react';
import { isFirstTimeVisitor, markVisitAsSeen, clearVisitData, getVisitDebugInfo, forceFirstTimeVisit } from '../utils/browserStorage';

const VideoDebugHelper: React.FC = () => {
  const [debugInfo, setDebugInfo] = React.useState<any>(null);

  const refreshDebugInfo = () => {
    const info = getVisitDebugInfo();
    setDebugInfo(info);
    console.log('Debug Info:', info);
  };

  React.useEffect(() => {
    refreshDebugInfo();
  }, []);

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '15px', 
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#ffff00' }}>Video Debug Helper</h4>
      
      <div style={{ marginBottom: '10px' }}>
        <strong>Is First Time Visitor:</strong> {isFirstTimeVisitor() ? 'YES' : 'NO'}
      </div>
      
      {debugInfo && (
        <div style={{ marginBottom: '10px', fontSize: '10px' }}>
          <strong>Storage Info:</strong>
          <pre style={{ margin: '5px 0', whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => {
            forceFirstTimeVisit();
            refreshDebugInfo();
            window.location.reload();
          }}
          style={{ 
            padding: '5px 8px', 
            fontSize: '10px', 
            background: '#007acc', 
            color: 'white', 
            border: 'none', 
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Force First Visit
        </button>
        
        <button 
          onClick={() => {
            markVisitAsSeen();
            refreshDebugInfo();
          }}
          style={{ 
            padding: '5px 8px', 
            fontSize: '10px', 
            background: '#cc7a00', 
            color: 'white', 
            border: 'none', 
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Mark as Seen
        </button>
        
        <button 
          onClick={refreshDebugInfo}
          style={{ 
            padding: '5px 8px', 
            fontSize: '10px', 
            background: '#00cc7a', 
            color: 'white', 
            border: 'none', 
            borderRadius: '3px',
            cursor: 'pointer'
          }}
        >
          Refresh Info
        </button>
      </div>
    </div>
  );
};

export default VideoDebugHelper;
