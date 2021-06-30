import Marker from "./Marker";

export const Markers = ({ projects, ...props }) => {
  projects = [
    {
      name: "morgue",
      state: "green",
      lngLat: [1, 35],
    },
    {
      name: "Universite",
      state: "red",
      lngLat: [1, 35],
    },
    {
      name: "Hopital",
      state: "yellow",
      lngLat: [1, 35],
    },
    {
      name: "morgue",
      state: "green",
      lngLat: [1, 35],
    },
  ];
  return (
    <>
      {projects.map((project) => (
        <Marker
          color={project.state}
          markerType="display"
          latitude={project.lngLat[0]}
          longitude={project.lngLat[1]}
        />
      ))}
    </>
  );
};
