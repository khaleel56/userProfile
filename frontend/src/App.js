import './App.css';
import Registration from './components/userRegistration'
import FetchImage from './components/FetchImage'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <ImageUpload></ImageUpload> */}
        <Registration></Registration>
        <FetchImage></FetchImage>
      </header>
    </div>
  );
}

export default App;
