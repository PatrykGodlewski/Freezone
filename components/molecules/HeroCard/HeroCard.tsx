import Badge from '@components/atoms/Badge/Badge';
import Button from '@components/atoms/Button/Button';
import React from 'react';

const HeroCard = ({ className, title, desc, badge, index }: any): any => {
  return (
    <div
      className={`ring-hover-effect  rounded relative text-gray-50 flex ${className}`}
    >
      <div className={`${index === 1 && 'hidden'}`}>
        <div
          className={`absolute inset-0 
        ${index === 0 && 'bg-gradient-to-r'} 
        ${index === 2 && 'bg-gradient-to-l'} 
        from-white dark:from-gray-900 to-transparent z-20`}
        />
        <div
          className={`overlay absolute inset-0 
        ${index !== 1 && 'bg-black bg-opacity-60'} 
        from-white to-transparent z-10`}
        />
      </div>
      <div className="absolute inset-0 flex flex-col justify-between p-4 gap-4 z-10">
        <Badge text={badge} type="white" />
        <div className="flex flex-col gap-4">
          <h2>{title}</h2>
          <p className="font-thin">{desc}</p>
          <Button type="invertedFull">{`Graj teraz w ${title}`}</Button>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-50 rounded" />
      <img
        className="object-fill rounded "
        src="https://via.placeholder.com/300x450"
        alt=""
      />
    </div>
  );
};

export default HeroCard;
