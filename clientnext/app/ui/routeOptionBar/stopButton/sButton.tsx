'use client';

import style from "./style.module.css";

interface ClientComponentProps {
  index: number;
  onClick: (index: number) => void;
}

export default function SButton({ index, onClick }: ClientComponentProps) {
  return (
    <button className={style.stopButton} onClick={() => onClick(index)}>Stop {index + 1}</button>
  );
}