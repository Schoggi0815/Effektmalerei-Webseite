import React from 'react';
import {ImageList, Toolbar} from '@mui/material';
import Image from "next/image";

export default function MainPage() {
  return (
    <div className={'main-page'}>
      <Toolbar sx={{ height: 90 }} />
      <ImageList variant={'masonry'} cols={3} gap={8}>
        <Image src={'/images/img1.jpg'} width={800} height={599}/>
        <Image src={'/images/img2.jpg'} width={800} height={599}/>
        <Image src={'/images/img3.jpg'} width={600} height={800}/>
        <Image src={'/images/img4.jpg'} width={600} height={800}/>
        <Image src={'/images/img5.jpg'} width={800} height={600}/>
        <Image src={'/images/img6.jpg'} width={599} height={800}/>
        <Image src={'/images/img7.jpg'} width={800} height={599}/>
        <Image src={'/images/img8.jpg'} width={800} height={599}/>
        <Image src={'/images/img9.jpg'} width={599} height={800}/>
        <Image src={'/images/img10.jpg'} width={480} height={340}/>
        <Image src={'/images/img11.jpg'} width={361} height={410}/>
        <Image src={'/images/img12.jpg'} width={800} height={450}/>
        <Image src={'/images/img13.jpg'} width={800} height={450}/>
        <Image src={'/images/img14.jpg'} width={800} height={450}/>
        <Image src={'/images/img15.jpg'} width={600} height={800}/>
        <Image src={'/images/img16.jpg'} width={800} height={450}/>
        <Image src={'/images/img17.jpg'} width={450} height={800}/>
      </ImageList>
    </div>
  );
}
