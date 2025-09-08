import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';
import { getStoredBaseURL, saveBaseURL, makeApiRequest } from '../utils/apiClient';

const RequestBuilder = ({ initialRequest, onRequest, onResponse, onNavigate }) => {
  const [method, setMethod] = useState('GET');
  const [doctype, setDoctype] = useState('');
  const [customDoctype, setCustomDoctype] = useState('');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState({});
  const [body, setBody] = useState('{}');
  const [params, setParams] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [baseURL, setBaseURL] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [doctypes, setDoctypes] = useState([]);
  const [showCustomDoctype, setShowCustomDoctype] = useState(false);
  const [response, setResponse] = useState(null);
  const [responseError, setResponseError] = useState(null);

  useEffect(() => {
    if (initialRequest) {
      setMethod(initialRequest.method);
      setDoctype(initialRequest.doctype);
      setUrl(initialRequest.url);
      setBaseURL(initialRequest.baseURL || '');
      setHeaders(initialRequest.headers || {});
      setBody(initialRequest.body || '{}');
      setParams(initialRequest.params || '');
    }
    
    // Load fallback doctypes on component mount
    if (CONFIG.COMMON_DOCTYPES.length > 0) {
      setDoctypes(CONFIG.COMMON_DOCTYPES);
    }
  }, [initialRequest]);

  // Remove fetchDoctypes as it's now handled in Dashboard

  const handleMethodChange = (newMethod) => {
    setMethod(newMethod);
  };

  const handleDoctypeChange = (selectedDoctype) => {
    setDoctype(selectedDoctype);
    setCustomDoctype('');
    setShowCustomDoctype(false);
    updateUrl(selectedDoctype, method);
  };

  const handleCustomDoctypeChange = (value) => {
    setCustomDoctype(value);
    setDoctype('');
    setShowCustomDoctype(true);
    updateUrl(value, method);
  };

  const updateUrl = (doctypeName, httpMethod) => {
    if (doctypeName) {
      const baseUrl = `/api/resource/${doctypeName}`;
      setUrl(baseUrl);
    }
  };

  const handleHeaderChange = (key, value) => {
    setHeaders(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const addHeader = () => {
    const key = prompt('Header key:');
    if (key) {
      setHeaders(prev => ({
        ...prev,
        [key]: ''
      }));
    }
  };

  const removeHeader = (key) => {
    setHeaders(prev => {
      const newHeaders = { ...prev };
      delete newHeaders[key];
      return newHeaders;
    });
  };

  const validateJson = (jsonString) => {
    try {
      JSON.parse(jsonString);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Removed save/load credentials - they reset on refresh

  const handleSubmit = async () => {
    setError(null);
    setResponseError(null);
    setLoading(true);

    try {
      // Validate inputs
      if (!doctype && !customDoctype) {
        throw new Error('Please select or enter a doctype');
      }

      if (!baseURL) {
        throw new Error('Please provide Base URL');
      }

      if (!apiKey || !apiSecret) {
        throw new Error('Please provide API Key and API Secret');
      }

      if (method !== 'GET' && body && !validateJson(body)) {
        throw new Error('Request body must be valid JSON');
      }

      const finalDoctype = doctype || customDoctype;
      const finalUrl = url || `/api/resource/${finalDoctype}`;

      // Prepare request data
      const requestData = {
        method,
        doctype: finalDoctype,
        url: finalUrl,
        baseURL,
        headers: {
          ...headers,
          'Authorization': `token ${apiKey}:${apiSecret}`,
          'Content-Type': 'application/json'
        },
        body: method !== 'GET' ? body : '',
        params
      };

      // Make the API call using the new API client
      const result = await makeApiRequest(requestData);
      
      if (result.success) {
        // Show response on the same page
        setResponse(result.data);
        setResponseError(null);
        onRequest(requestData);
        onResponse(result.data, null);
      } else {
        throw new Error(result.error);
      }
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred';
      setError(errorMessage);
      setResponseError(errorMessage);
      setResponse(null);
      onResponse(null, errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-builder">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            🔧 Build Request
          </h2>
        </div>
        
        {/* Authentication Section */}
        <div className="auth-section">
          <h4>🔐 Authentication</h4>
          <div className="auth-inputs">
            <div className="form-group">
              <label className="form-label">🌐 Base URL</label>
              <input
                type="url"
                className="form-control"
                value={baseURL}
                onChange={(e) => setBaseURL(e.target.value)}
                placeholder="https://your-erpnext-instance.com"
              />
            </div>
            <div className="form-group">
              <label className="form-label">🔑 API Key</label>
              <input
                type="text"
                className="form-control"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your ERPNext API Key"
              />
            </div>
            <div className="form-group">
              <label className="form-label">🔐 API Secret</label>
              <input
                type="password"
                className="form-control"
                value={apiSecret}
                onChange={(e) => setApiSecret(e.target.value)}
                placeholder="Enter your ERPNext API Secret"
              />
            </div>
          </div>
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
            Note: Credentials will reset when you refresh the page
          </div>
        </div>

        {/* HTTP Method Selection */}
        <div className="form-group">
          <label className="form-label">🌐 HTTP Method</label>
          <div className="method-selector">
            {['GET', 'POST', 'PUT', 'DELETE'].map(m => (
              <button
                key={m}
                className={`method-btn ${method === m ? 'active' : ''}`}
                onClick={() => handleMethodChange(m)}
              >
                <span className={`method-tag method-${m.toLowerCase()}`}>{m}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Doctype Selection */}
        <div className="form-group">
          <label className="form-label">📄 Doctype</label>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <select
              className="form-control"
              value={doctype}
              onChange={(e) => handleDoctypeChange(e.target.value)}
              style={{ flex: 1 }}
            >
              <option value="">Select a doctype...</option>
              {doctypes.map((dt, index) => (
                <option key={index} value={dt}>{dt}</option>
              ))}
            </select>
            <span>or</span>
            <input
              type="text"
              className="form-control"
              value={customDoctype}
              onChange={(e) => handleCustomDoctypeChange(e.target.value)}
              placeholder="Enter custom doctype"
              style={{ flex: 1 }}
            />
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
            💡 {doctypes.length} doctypes available. Use dropdown or type custom doctype name.
          </div>
        </div>

        {/* URL Display */}
        <div className="form-group">
          <label className="form-label">URL</label>
          <input
            type="text"
            className="form-control"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="API endpoint URL"
          />
        </div>

        {/* Headers */}
        <div className="form-group">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <label className="form-label">Headers</label>
            <button className="btn btn-secondary" onClick={addHeader} style={{ padding: '5px 10px', fontSize: '12px' }}>
              Add Header
            </button>
          </div>
          {Object.entries(headers).map(([key, value]) => (
            <div key={key} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
              <input
                type="text"
                className="form-control"
                value={key}
                onChange={(e) => {
                  const newHeaders = { ...headers };
                  delete newHeaders[key];
                  newHeaders[e.target.value] = value;
                  setHeaders(newHeaders);
                }}
                style={{ flex: 1 }}
              />
              <span>:</span>
              <input
                type="text"
                className="form-control"
                value={value}
                onChange={(e) => handleHeaderChange(key, e.target.value)}
                style={{ flex: 2 }}
              />
              <button
                className="btn btn-danger"
                onClick={() => removeHeader(key)}
                style={{ padding: '5px 10px', fontSize: '12px' }}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* Request Body (for POST, PUT) */}
        {method !== 'GET' && (
          <div className="form-group">
            <label className="form-label">Request Body (JSON)</label>
            <textarea
              className="form-control textarea json-editor"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Enter JSON request body"
            />
          </div>
        )}

        {/* Query Parameters */}
        <div className="form-group">
          <label className="form-label">Query Parameters</label>
          <input
            type="text"
            className="form-control"
            value={params}
            onChange={(e) => setParams(e.target.value)}
            placeholder="e.g., name=value&limit=20"
          />
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <div style={{ marginTop: '20px' }}>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={loading}
            style={{ marginRight: '10px' }}
          >
            {loading ? 'Sending...' : 'Send Request'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => onNavigate('/')}
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Response Display Section */}
      {(response || responseError) && (
        <div className="card" style={{ marginTop: '20px' }}>
          <div className="card-header">
            <h3 className="card-title">
              📡 API Response
            </h3>
          </div>
          {responseError ? (
            <div className="error-message">
              <h4>❌ Error Response:</h4>
              <pre style={{ 
                backgroundColor: '#1e293b', 
                color: '#e2e8f0',
                padding: '15px', 
                borderRadius: '5px',
                overflow: 'auto',
                maxHeight: '400px',
                fontFamily: 'JetBrains Mono, Fira Code, Courier New, monospace',
                fontSize: '0.875rem',
                lineHeight: '1.6'
              }}>
                {responseError}
              </pre>
            </div>
          ) : (
            <div className="response-display">
              <div className="success-message" style={{ marginBottom: '15px' }}>
                ✅ <strong>Success Response</strong> - Request completed successfully
              </div>
              <pre style={{ 
                backgroundColor: '#1e293b', 
                color: '#e2e8f0',
                padding: '15px', 
                borderRadius: '5px',
                overflow: 'auto',
                maxHeight: '400px',
                fontFamily: 'JetBrains Mono, Fira Code, Courier New, monospace',
                fontSize: '0.875rem',
                lineHeight: '1.6'
              }}>
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RequestBuilder;
