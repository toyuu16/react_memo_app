import './App.css';
import React from 'react';


  const Board = () => {

    React.useEffect(() => {
    
      // イベントの設定- リロード
      window.addEventListener('beforeunload', onUnload);

　　  return () => {
        // イベントの設定解除
        window.removeEventListener('beforeunload', onUnload);
      }
    })

    const onUnload = (e) => {
      e.preventDefault();
      e.returnValue = '';
    }


    const [dragging, setDragging] = React.useState({ key: "", x:0, y:0 });
    const [editMod1, setEditMode1] = React.useState({ key: "" });
    const [editMod2, setEditMode2] = React.useState({ key: "" });
    const [cards, setCards] = React.useState(null);

    //追加
    const add = () => {
      const newCards = {
        ...cards,
        [Math.random().toString(36).slice(-8)]: {
          t: "title",
          d: "description",
          x: Math.floor(Math.random() * (200 - 80) + 80),
          y: Math.floor(Math.random() * (200 - 80) + 80),
        },
      };
      setCards(newCards);
    };

    //内容更新  
    const update = (key, card) => {
      const newCards = { ...cards, [key]: card };
      setCards(newCards);
    };

    //削除
    const remove = (key) => {
      const newcards = cards;
      delete newcards[key];
      setCards(newcards);
    };

    if (!cards) return <button className="AddCard" onClick={() => add()}>add card</button>;
    return (
      <div
      // 全体
      style={{ width: "80%", height: "80%", position: "relative" }}
      onDrop={(e) => {
        if(!dragging || !cards) return;
        update(dragging.key, {...cards[dragging.key], x:e.clientX - dragging.x, y:e.clientY - dragging.y});
      }}
      onDragOver={(e) => e.preventDefault()} // enable onDrop event
      >
      <button className="AddCard" onClick={() => add()}>add card</button>
      {Object.keys(cards).map((key) => (
        <div
          className="Card"
          key={key}
          style={{ position: "absolute", top: cards[key].y + "px", left: cards[key].x + "px" }}
          draggable={true}
          onDragStart={(e) => {
            /* 空 削除 */
            if(!cards[key]){
              setDragging({ key, x: 999, y: 999 });
              return
            }
            setDragging({ key, x: e.clientX - cards[key].x, y: e.clientY - cards[key].y });
          }}
        >
          {/* 
              textarea編集モード 
              title
          */}
          <div className="textarea">
          {editMod1.key === key ? (
            <textarea
              className="title"
              onBlur={(e) => setEditMode1({ key: "" })}
              onChange={(e) => update(key, { ...cards[key], t: e.target.value })}
              defaultValue={cards[key].t}
            />
          ) : (
            <div className="title" onClick={(e) => setEditMode1({ key })}>{cards[key].t}</div>
          )}
          {/* description */}
          {editMod2.key === key ? (
            <textarea
              className="description"
              onBlur={(e) => setEditMode2({ key: "" })}
              onChange={(e) => update(key, { ...cards[key], d: e.target.value })}
              defaultValue={cards[key].d}
            />
          ) : (
            <div className="description" onClick={(e) => setEditMode2({ key })}>{cards[key].d}</div>
          )}
          </div>
          <button className="DeleteBtn" onClick={() => remove(key)}>x</button>
        </div>
    ))}
  </div>
)};


export default Board;
