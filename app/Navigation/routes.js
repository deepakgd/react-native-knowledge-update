import HomeScreen from '../Views/Home';
import AboutScreen from '../Views/About';
import CanvasPOCScreen from '../Views/CanvasPOC';
import DragglePocScreen from '../Views/DragglePoc';
import BarcodeScannerScreen from '../Views/BarcodeScanner';
import FacedetectionScreen from '../Views/Facedetection';
import FaceMaskScreen from '../Views/FaceMask';
import AdvanceCameraScreen from '../Views/AdvanceCamera';
import FaceMarkerScreen from '../Views/FaceMarker';
import FacebookComponentScreen from '../Views/FacebookComponent';
import GoogleMapScreen from '../Views/GoogleMap';
import CurrentLocationScreen from '../Views/CurrentLocation';
import CalculatorScreen from '../Views/Calculator';

/* Icon key is optional. It must be of type string and its value should match a valid provider icon
  name.
  To omit the icon just pass null on its value.
*/
export default [
  { name: 'POC App', screen: HomeScreen, icon: 'book' },
  { name: 'About', screen: AboutScreen, icon: 'information-outline' },
  { name: 'Canvas POC', screen: CanvasPOCScreen, icon: 'image' },
  { name: 'Draggle Poc', screen: DragglePocScreen, icon: 'information-outline' },
  { name: 'BarcodeScanner', screen: BarcodeScannerScreen, icon: 'scanner' },
  { name: 'Facedetection', screen: FacedetectionScreen, icon: 'face' },
  { name: 'FaceMask', screen: FaceMaskScreen, icon: 'face' },
  { name: 'AdvanceCamera', screen: AdvanceCameraScreen, icon: 'camera' },
  { name: 'FaceMarker', screen: FaceMarkerScreen, icon: 'information-outline', isDrawerDisabled: true },
  { name: 'FacebookComponent', screen: FacebookComponentScreen, icon: 'facebook' },
  { name: 'GoogleMap', screen: GoogleMapScreen, icon: 'map' },
  { name: 'CurrentLocation', screen: CurrentLocationScreen, icon: 'map'  },
  { name: 'Calculator', screen: CalculatorScreen, icon: 'calculator' }
];
 