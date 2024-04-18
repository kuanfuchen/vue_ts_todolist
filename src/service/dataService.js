import { Subject, BehaviorSubject } from 'rxjs';
import axios from 'axios';
const _getTodolistInfo$  = new BehaviorSubject([]);
const webLink = 'http://localhost:3000/todos';
const appListenService = ()=>{
  return
  fetch(webLink).then((items)=>{
    console.log(items, 'irems')
    return items.json();
  }).then((items)=>{
    _getTodolistInfo$.next(items)
  })
};
const updateTodo = (item)=>{
  const id = item._id;
  const patchWeblink = `${webLink}/${id}`;
  const editContent = {
    'content':item.content,
    'name':item.name,
    'progress':item.progress,
    'finish':item.finish
  }
  axios.patch(patchWeblink,editContent).then(()=>appListenService())
}
const postNewtodo = (item) => {
  axios.post(webLink,item).then((response)=>{
    appListenService()
  })
};
const deletedTodo = (id)=>{
  const webPath = `${webLink}/${id}`;
  axios.delete(webPath).then(() => appListenService());
}
export const serviceListen = {
  appListenService,
  updateTodo,
  postNewtodo,
  deletedTodo,
  getTodolistInfo$:_getTodolistInfo$.asObservable(),
};
