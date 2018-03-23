AFRAME.registerComponent('chest', {
	schema: {
		open: {
			default: false
		},
		dimension: {
			default: 1
		},
		lidThickness: {
			default: 0.1
		}
	},

	update: function () {
		var object3D = this.el.object3D;
		var data = this.data;

		var pos = this.el.components.position.data;

		this.el.setAttribute('position', pos);

		var boxBack = document.createElement('a-box');
		boxBack.setAttribute('position', pos);
		boxBack.setAttribute('width', data.dimension);
		boxBack.setAttribute('height', data.dimension);
		boxBack.setAttribute('depth', data.dimension);
		boxBack.setAttribute('material', { shader: 'flat', 'src': 'assets/tessellated/wood-planks-01.jpg' });
		boxBack.setAttribute('dynamic-body', true);
		boxBack.setAttribute('physics-body', { mass: 10000 });
		
		var boxLid = document.createElement('a-box');
		var lidPos = Object.assign({}, pos);
		lidPos.y += data.lidThickness + 0.01;
		boxLid.setAttribute('material', { shader: 'flat', src: 'assets/tessellated/wood-planks-02.jpg', rotation: { x: 0, y: 90, z: 0 } });
		boxLid.setAttribute('width', data.dimension);
		boxLid.setAttribute('height', data.lidThickness);
		boxLid.setAttribute('depth', data.dimension);
		boxLid.setAttribute('dynamic-body', true);
		boxLid.setAttribute('position', lidPos);
		boxLid.setAttribute('physics-body', { mass: 1 });
		boxLid.setAttribute('constraint', { 
			type: 'hinge',
			target: boxBack,
			maxForce: 10,
			axis: { x: 0, y: 0, z: data.dimension },
			targetAxis: { x: 0, y: 0, z: data.dimension },
			pivot: { x: -data.dimension / 2, y: -0.05, z: 0 },
			targetPivot: { x: -data.dimension / 2, y: data.dimension / 2, z: 0 }
		});

		//this.boxBottom = boxBottom;
		this.boxBack = boxBack;
		this.boxLid = boxLid;

		//this.el.appendChild(this.boxBottom);
		this.el.appendChild(this.boxBack);
		this.el.appendChild(this.boxLid);
	},

	tick: function() {
		//console.log('yo');
		var pos = this.data.position;

		//this.el.setAttribute(data)
	}
});