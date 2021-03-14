
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Rooters from "./layout/Router"; 

function App() {
  return (
    <div className="App">
      <Header/>
      <Rooters />
      <Footer/>
    </div>
  );
}

export default App;
