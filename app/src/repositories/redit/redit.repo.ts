import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';
import ReditService from '../../services/redit/redit.svc';

export default class ReditRepository extends BaseRepository {
    postArray: Array<models.IPost> = [];
    constructor(private reditSvc: ReditService) {
        super();
    };




    getSpecificPost(params: any) {
        if (this.postArray.length === 0) {
            console.log(this.postArray)
            this.getReditList().then((success) => {
                console.log(this.postArray);
                this.getSpecificPost(params);
                console.log(this.postArray.length)
            })
        }

        for (let i = 0; i < this.postArray.length; i++) {
            if (this.postArray[i].id === params) {
                return this.postArray[i];
            }
        }
    }


    getReditList(): async.IThenable<Array<models.IPost>> {
        return this.reditSvc.getReditList().then((success) => {
            this.postArray = [];
            success.forEach((post) => {
                let crap: models.IPost = {
                    author: post.data.author,
                    title: post.data.title,
                    url: post.data.url,
                    id: post.data.id
                }
                this.postArray.push(crap);
            });
            return this.postArray;
        })

    }
}

register.injectable('redit-repo', ReditRepository, [ReditService]);
