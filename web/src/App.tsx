import React from 'react';
import './App.css';
import useAPI, {useApiProps} from "./hooks/useAPI";
import VideosTable from "./components/videosTable/videosTable";
import VideosTableFilter from "./components/videosTable/filters/videosTableFilter";

function App() {
  let {result,loading,get} = useAPI({path:"videos"});

  console.log(result);

  return (
    <div className="App">
      {loading && result}
      <VideosTable dataSource={result || []} loading={loading}/>
      <ControlledVideosTable/>
    </div>
  );
}

export default App;
