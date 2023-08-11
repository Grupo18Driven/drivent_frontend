import { IoPersonOutline } from 'react-icons/io5';
import { Icons, RoomCard } from '.';

export default function Room() {
  return (
    <>
      <RoomCard>
        <p>Name</p>
        <Icons>
          <IoPersonOutline></IoPersonOutline>
          <IoPersonOutline></IoPersonOutline>
          <IoPersonOutline></IoPersonOutline>
        </Icons>
      </RoomCard>
    </>
  );
};
