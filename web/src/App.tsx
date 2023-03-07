import React from 'react';
import './App.css';
import useAPI, {useApiProps} from "./hooks/useAPI";
import VideosTable from "./components/videosTable/videosTable";


function App() {
  let {result,loading,get} = useAPI({path:"videos"});

  return (
    <div className="App">
      {loading && result}
      <VideosTable dataSource={result || []} loading={loading}/>
    </div>
  );
}

export default App;
