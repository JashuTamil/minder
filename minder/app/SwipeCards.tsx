"use client";

import React, { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const SwipeCards = () => {
  const [cards, setCards] = useState(cardData);

  return (
    <div
      className="grid h-[400px] w-full place-items-center"
    >
      {cards.map((card) => {
        return (
          <Card key={card.id} cards={cards} setCards={setCards} {...card} />
        );
      })}

      {cards.length > 0 ? (
        <p className="mt-4"> Name: {cards[cards.length - 1].name}</p>
      ) : (
        <p className="mt-4">No more cards</p>
      )}
    </div>
  );
};

type CardType = {
  name: string;
  id: number;
  url: string;
};

type CardProps = {
  name: string;
  id: number;
  url: string;
  setCards: React.Dispatch<React.SetStateAction<CardType[]>>;
  cards: CardType[];
};

const Card: React.FC<CardProps> = ({ name, id, url, setCards, cards }) => {
  const x = useMotionValue(0);

  const rotate = useTransform(x, [-150, 150], [-18, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  const handleDragEnd = () => {
    if (Math.abs(x.get()) > 100) {
      setCards((pv) => pv.filter((v) => v.name !== name));
    }
  };

  return (
    <>
    <motion.img
      src={url}
      alt="Placeholder alt"
      className="h-96 w-72 origin-bottom rounded-lg bg-white object-cover hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
        transition: "0.125s transform",
      }}
      drag='x'
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      onDragEnd={handleDragEnd}
    />
    </>
 );
};

    {/*
    
    
    <motion.div
      className="h-96 w-72 origin-bottom rounded-lg bg-white  object-cover hover:cursor-grab active:cursor-grabbing"
      style={{
        gridRow: 1,
        gridColumn: 1,
        x,
        opacity,
        rotate,
      }}
       drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onPanEnd={handleDragEnd}
      onTap={() => setFlipped((f) => !f)}
    >
      <motion.div
        className="relative h-full w-full rounded-lg shadow-lg object-cover hover:cursor-grab active:cursor-grabbing"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front side }
        <div className="absolute inset-0 backface-hidden">
          <img
            src={url}
            alt="Front"
            className="h-full w-full rounded-lg object-cover"
          />
        </div>

        {/* Back side }
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-white p-4 backface-hidden [transform:rotateY(180deg)]">
          <p className="text-center text-lg font-semibold text-gray-800">
            Card {id} info goes here!
          </p>
        </div>
    </motion.div>
    </motion.div>


*/}
 
export default SwipeCards;

const cardData = [
  {
    name: "shoes",
    id: 1,
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "socks",
    id: 2,
    url: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?q=80&w=2235&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "vertigo",
    id: 3,
    url: "https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2342&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "nikes",
    id: 4,
    url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2224&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "adidas",
    id: 5,
    url: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "shaw",
    id: 6,
    url: "https://images.unsplash.com/photo-1570464197285-9949814674a7?q=80&w=2273&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "guarana",
    id: 7,
    url: "https://images.unsplash.com/photo-1578608712688-36b5be8823dc?q=80&w=2187&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "git gud",
    id: 8,
    url: "https://images.unsplash.com/photo-1505784045224-1247b2b29cf3?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];