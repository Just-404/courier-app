const Menu = ({ data, setActiveSection }) => {
  return (
    <ul>
      {data.map((elem) => (
        <li key={elem.id}>
          <img src={elem.icon} alt="icon photo" className="icon" />
          <button onClick={() => setActiveSection(elem.title)}>
            {elem.title}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
