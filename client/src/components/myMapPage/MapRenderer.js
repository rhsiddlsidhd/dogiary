import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import markerIcon from '../icons/markerIcon.svg';
import { useSelector } from 'react-redux';
import { showAllPlaces } from '../../utils/mapApi';

const { kakao } = window;

function MapRenderer() {
  const markers = useSelector((state)=>state.map.markers);
  const [map, setMap] = useState();
  const [isMarkerClicked, setIsMarkerClicked] = useState();

  useEffect(() => {
    if (!map) return;

    const bounds = new kakao.maps.LatLngBounds();
    markers.forEach((marker) => {
      bounds.extend(new kakao.maps.LatLng(marker.position.lat, marker.position.lng));
    });

    map.setBounds(bounds);
  }, [map, markers]);

  const [positions, setPositions] = useState([]);
  const [contents, setContents] = useState([]);
  useEffect(() => {
    // 모든 장소 정보 조회 API 호출 
    // 좌표값만 추출
    showAllPlaces().then((response, index) => {
      const placesData = response.data.data;  
      console.log(placesData);
        const _positions = placesData.map(place => ({
          lat: place.position[1], 
          lng: place.position[0]  
        }));
        
        const _contents = placesData.map(place => place.content);
        setPositions(_positions);
        setContents(_contents);
        
        setIsMarkerClicked(Array(_positions.length).fill(false));
      
    }); 
  }, []);

  //마커 클릭하면 장소이름 보여주기
  
  function handleMarkerClick(index) {
    setIsMarkerClicked(prevState => {
      const updatedMarkers = [...prevState];
      updatedMarkers[index] = !updatedMarkers[index];
      return updatedMarkers;
    });
  }

  return (
    <MapStyle>
      <Map
        id="map"
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        level={3}
        onCreate={setMap}
      >
        {
          positions.map((position,index)=>(
            <MapMarker
            key={`marker-${contents[index]}-${position.lat},${position.lng}-${index}`}
            position={{ lat: position.lat, lng: position.lng }}
            image={{
              src: markerIcon,
              size: {
                width: 40,
                height: 40,
              },
            }}
            onClick={()=>handleMarkerClick(index)}
          >
            
          {isMarkerClicked[index] && (
            <div>
              {contents[index]}
            </div>
          )}

          </MapMarker>
          ))
        }
      </Map>
    </MapStyle>
  );
}

export default MapRenderer;

const MapStyle = styled.div`
  #map {
    position: fixed;
    top: 12vh;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: -10000;
  }
`