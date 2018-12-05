import React, {Component} from 'react';
import Masonry from 'react-masonry-component';

class noteView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleImagesLoaded(imagesLoadedInstance) {
    alert('2')
  }

  render() {
    const arr = ['http://p16.qhimg.com/bdm/1440_900_85/d/_open360/cartoonm0115/10.jpg', 'http://img2.100bt.com/upload/ttq/20121215/1355550403927.jpeg', 'http://pic17.photophoto.cn/20101103/0005018306177111_b.jpg', 'http://img4.a0bi.com/upload/ttq/20171015/1508035495221.jpg','http://p16.qhimg.com/bdm/1440_900_85/d/_open360/cartoonm0115/10.jpg', 'http://img2.100bt.com/upload/ttq/20121215/1355550403927.jpeg', 'http://pic17.photophoto.cn/20101103/0005018306177111_b.jpg', 'http://img4.a0bi.com/upload/ttq/20171015/1508035495221.jpg','http://p16.qhimg.com/bdm/1440_900_85/d/_open360/cartoonm0115/10.jpg', 'http://img2.100bt.com/upload/ttq/20121215/1355550403927.jpeg', 'http://pic17.photophoto.cn/20101103/0005018306177111_b.jpg', 'http://img4.a0bi.com/upload/ttq/20171015/1508035495221.jpg','http://p16.qhimg.com/bdm/1440_900_85/d/_open360/cartoonm0115/10.jpg', 'http://img2.100bt.com/upload/ttq/20121215/1355550403927.jpeg', 'http://pic17.photophoto.cn/20101103/0005018306177111_b.jpg', 'http://img4.a0bi.com/upload/ttq/20171015/1508035495221.jpg']
    const childElements = arr.map(function (element, index) {
      return (
        <div key={index} className="image-element-class">
          <img style={{width: 500, margin: 20}} src={element} alt={element} />
        </div>
      );
    });

    return (
      <Masonry
        ref={ref => this.masonryRef = ref}
        className="masonry"
        style={{margin: '0 auto'}}
        elementType="div"
        options={{transitionDuration: 0, fitWidth: true}}
        onImagesLoaded={this.handleImagesLoaded}
        disableImagesLoaded={false}
        updateOnEachImageLoad={false}
      >
        {childElements}
      </Masonry>
    );
  }
}

export default noteView;
