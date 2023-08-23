import GoogleMapReact from 'google-map-react';

export default function BossiMaps() {
    const position = {
        lat: 47.4073326,
        lng: 8.7240477
    };

    const defaultProps = {
        center: position,
        zoom: 18
    };

    return <div style={{width: '100%', height: 500}}>
        <GoogleMapReact
            bootstrapURLKeys={{key: 'AIzaSyCGn5eYQD9rhSlEl88mnClVzEq4pCsaby8'}}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            yesIWantToUseGoogleMapApiInternals
            options={{mapId: 'EffektmalereiBossi'}}
            onGoogleApiLoaded={async ({maps, map}) => {
                // @ts-ignore
                const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
                const marker = new AdvancedMarkerElement({
                    map: map,
                    position: position,
                    title: 'Uluru'
                });
            }}
        />
    </div>
}