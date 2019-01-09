import dva from 'dva';
import './index.less';
// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/login/login').default);

app.model(require('./models/mybooks/mybooks').default);

app.model(require('./models/myborrow/myborrow').default);

app.model(require('./models/mybookgroup/mybookgroup').default);
app.model(require('./models/mygrouping/mygrouping').default);
app.model(require('./models/mynote/mynote').default);
app.model(require('./models/myrecord/myrecord').default);
app.model(require('./models/myphotos/myphotos').default);
app.model(require('./models/myaudio/myaudio').default);
app.model(require('./models/myincome/myincome').default);
app.model(require('./models/createnew/createnew').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

export default app._store; // eslint-disable-line
