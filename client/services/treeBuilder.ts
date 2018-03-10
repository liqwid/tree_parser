import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/do'

import { Service, } from 'typedi'

import { TreeNode, DEFAULT_ROOT_NODE } from 'models/tree'
import parseStringTree from 'services/stringParser'

@Service()
export class TreeBuilderService {
  private treeState: BehaviorSubject<TreeNode> = new BehaviorSubject(DEFAULT_ROOT_NODE)
  private treeStringState: BehaviorSubject<string> = new BehaviorSubject('')

  public updateTree(treeString: string) {
    if (this.treeStringState.getValue() === treeString) return
    this.treeStringState.next(treeString)

    this.treeState.next(parseStringTree(treeString))
  }

  public getTreeStringStream() {
    return this.treeStringState.asObservable()
  }
  
  public getTreeStream(): Observable<TreeNode> {
    return this.treeState.asObservable()
  }
}
