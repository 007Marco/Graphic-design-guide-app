import fs from 'node:fs';
import zlib from 'node:zlib';

function createPng(width, height, r, g, b) {
  // Signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: truecolor (RGB)
  ihdr[10] = 0; // compression
  ihdr[11] = 0; // filter
  ihdr[12] = 0; // interlace

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Raw pixel data: each row starts with filter byte 0
  const rowSize = 1 + width * 3;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter: none
    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 3;
      // Border or logo center
      const inBox = x >= width * 0.15 && x <= width * 0.85 && y >= height * 0.15 && y <= height * 0.85;
      if (inBox) {
        rawData[pxOffset] = 37; // Blue 37, 99, 235
        rawData[pxOffset + 1] = 99;
        rawData[pxOffset + 2] = 235;
      } else {
        rawData[pxOffset] = r;
        rawData[pxOffset + 1] = g;
        rawData[pxOffset + 2] = b;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);

  const crc = crc32(Buffer.concat([typeBuf, data]));
  crcBuf.writeUInt32BE(crc >>> 0, 0);

  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function crc32(buf) {
  let table = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }

  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ table[(crc ^ buf[i]) & 0xff];
  }
  return crc ^ -1;
}

if (!fs.existsSync('/public')) fs.mkdirSync('/public');
fs.writeFileSync('/public/icon-192.png', createPng(192, 192, 15, 23, 42));
fs.writeFileSync('/public/icon-512.png', createPng(512, 512, 15, 23, 42));
fs.writeFileSync('/public/icon-maskable-512.png', createPng(512, 512, 15, 23, 42));
console.log('Successfully created PWA icons in /public');
