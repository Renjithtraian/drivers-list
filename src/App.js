import { DndProvider } from 'react-dnd';
import './App.scss';
import DataList from './components/DataList';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
    <div className="App">
      <DataList/>
    </div>
    </DndProvider>
  );
}

export default App;
