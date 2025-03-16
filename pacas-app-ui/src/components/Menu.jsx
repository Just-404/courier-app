const Menu = ({ data }) => {
  return (
    <ul>
      {data.map((elem) => (
        <li key={elem.id}>
          <img src={elem.icon} alt="icon photo" className="icon" />
          <button>{elem.title}</button>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
