import { CanvaParams, Bound } from "../interfaces"

export const getCanva = (data: CanvaParams) => {
    const { boundary, roads, buildings } = data;

    return `
        <canvas id="canvas" width="1000" height="800"></canvas>
        <script>
            const canvas = document.getElementById('canvas');
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, 1000, 800);
            ctx.strokeStyle = '#000';
            ctx.strokeRect(0, 0, 1000, 800);
            ctx.strokeStyle = '#000';
            ctx.beginPath();
            ctx.moveTo(${boundary.minlon}, ${boundary.minlat});
            ctx.lineTo(${boundary.minlon}, ${boundary.maxlat});
            ctx.lineTo(${boundary.maxlon}, ${boundary.maxlat});
            ctx.lineTo(${boundary.maxlon}, ${boundary.minlat});
            ctx.lineTo(${boundary.minlon}, ${boundary.minlat});
            ctx.stroke();
            ctx.closePath();
        </script>
    `;
}