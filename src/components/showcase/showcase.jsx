import { useState, useEffect } from "react";
import modul from "./style.module.css";

function Show() {
  const [value, setValue] = useState("");
  const [data, setData] = useState([]);

  //   bu input ma'lumotini olish start
  const get__info = (event) => {
    event.preventDefault();
    if (value.trim() == "") return;
    let date_input = {
      id: Date.now(),
      value,
    };
    //   bu input ma'lumotini olish finsh

    // local storga yozish
    setData((old_data) => {
      let new_data = [...old_data, date_input];

      localStorage.setItem("data", JSON.stringify(new_data));
      return new_data;
    });
    //  local storga yozish
    // bu setvaluni ichini boshatish
    setValue("");
    // bu setvaluni ichini boshatish
  };

  useEffect(() => {
    let get_item = JSON.parse(localStorage.getItem("data"));
    if (get_item) {
      setData(get_item);
    }
    console.log(get_item);
  }, []);

  //   datadan malumot olish edi bu

  //   edit

  let edit = (id) => {
    console.log(id);
  };
  // edit
  //   delet qilish

  let del = (id) => {
    const fill_ = data.filter((element) => {
      return element.id !== id;
    });

    setData(fill_);
    localStorage.setItem("data", JSON.stringify(fill_));
  };
  // del
  return (
    <div className={modul.main}>
      <div className="container">
        <div className={modul.main__left}>
          <h3>Create new line :(</h3>

          <form className={modul.form}>
            <input
              type="text"
              placeholder="Add a new task"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={get__info} id={modul.plus} type="submit">
              +
            </button>
          </form>

          <div className={modul.main__right}>
            {data.length > 0 ? (
              data.map((item) => (
                <div key={item.id} className={modul.list}>
                  <div className={modul.text_change}>
                    <div className={modul.text_input}>
                      <p>{item.value}</p>
                    </div>
                  </div>
                  <div className={modul.text_change}>
                    <button onClick={() => edit(item.id)} id={modul.edit}>
                      Edit
                    </button>
                    <button onClick={() => del(item.id)} id={modul.del}>
                      Del
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Show;
