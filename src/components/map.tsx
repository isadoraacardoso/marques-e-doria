import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const position: [number, number] = [-21.24404, -45.0003];

export default function Mapa() {
  return (
    <div className="h-[300px] rounded-lg overflow-hidden">
      <MapContainer
        {...{
          center: [-21.24404, -45.0003] as [number, number],
          zoom: 17,
          style: { height: "100%", width: "100%" },
        }}
      >
        <TileLayer
          {...{
            attribution: "&copy; OpenStreetMap contributors",
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          }}
        />
        <Marker position={position}>
          <Popup>Rua Doutor Francisco Salles, 747, sala 11 – Lavras/MG</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
