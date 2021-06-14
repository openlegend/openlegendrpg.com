export function searchParams(parameterName, val, updateUrlParamsCallback) {
  const paramName = parameterName.toLowerCase(), valString = val.toString();
      const baseURL = window.location.protocol + `//` +  window.location.host + window.location.pathname;
      let urlParams = new URLSearchParams(window.location.search);
      if (window.location.pathname === '/feats') {
        urlParams = new URLSearchParams(`${paramName}=${valString}`);
      }
       else if(!valString) {
        urlParams.delete(paramName)
      }
      else if (urlParams.has(paramName)) {
        urlParams.set(paramName, valString);     
      } else {
        urlParams.append(paramName, valString) 
      }
      const newQueryString = '?' + urlParams.toString();
      
      window.history.pushState({ path: baseURL + newQueryString}, '', baseURL + newQueryString );
      updateUrlParamsCallback(window.location);
}
