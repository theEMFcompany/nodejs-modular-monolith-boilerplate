import * as C from '../constants/';
import path from 'path';
import pug from 'pug';

const compileTemplate = (templatePath)=>{
    return pug.compileFile(templatePath, {
        filename: path.basename(templatePath, 'pug'),
        doctype: 'strict',
        globals: ['process', '__dirname', '__filename'],
        basedir: path.dirname(templatePath),
    })
}

export const init = (mediator, templates: {[key: string]: string} ) => {
  mediator.once(C.events.TEMPLATES_START, () => {
    const cache = {};
    Object.keys(templates).forEach(template=>{
      cache[template] = compileTemplate( templates[template])
    })
    mediator.emit(C.events.TEMPLATES_READY, cache);
  })
};