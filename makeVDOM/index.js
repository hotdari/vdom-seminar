function h(tag, props, ...children) {
    return { tag, props, children: children.flat() }
}

function createElement(node) {
    if (typeof node === 'string') {
        // text node를 만들어서 반환한다.
        return document.createTextNode(node);
    }

    // tag에 대한 element를 만든다.
    const el = document.createElement(node.tag);

    // 정의한 속성을 삽입한다.
    Object.entries(node.props || {})
        .filter(([attr, value]) => {
            return value
        })
        .forEach(([attr, value]) => (
            el.setAttribute(attr, value)
        ));

    // node의 children virtual dom을 dom으로 변환한다.
    // 즉, 모든 VirtualDOM을 순회한다.
    const children = node.children.map((child) => {
        return createElement(child)
    });

    // $el에 변환된 children dom을 추가한다.
    children.forEach(child => el.appendChild(child));

    // 변환된 dom을 반환한다.
    return el;
}
const realNodes = (
    h('div', { id: 'app' },
        h('form', null,
            h('input', { type: 'text', class: 'input_text'}),
            h('button', { type: 'submit', class: 'submit_btn' }, '+'),
        ),
        h('ul', null,
            h('li', null,
                h('span', null,
                    h('input', { type: 'checkbox', class: 'input_check' }),
                    '데일리 미팅 준비하기'
                ),
                h('button', { class: 'remove_btn' }, '-')
            ),
            h('li', { class: 'completed' },
                h('span', null,
                    h('input', { type: 'checkbox', class: 'input_check', checked: true }),
                    '데일리 미팅 이후 업무 내용 변경된 것 체크하기'
                ),
                h('button', { class: 'remove_btn' }, '-')
            ),
        )
    )
)

const nodes = (
    h('div', { id: 'app' },
        h('form', null,
            h('input', { type: 'text', class: 'input_text'}),
            h('button', { type: 'submit', class: 'submit_btn' }, '+'),
        ),
        h('ul', null,
            h('li', null,
                h('span', null,
                    h('input', { type: 'checkbox', class: 'input_check', checked: true }),
                    '데일리 미팅 준비하기'
                ),
                h('button', { class: 'remove_btn' }, '-')
            ),
            h('li', { class: 'completed' },
                h('span', null,
                    h('input', { type: 'checkbox', class: 'input_check', checked: true }),
                    '데일리 미팅 이후 업무 내용 변경된 것 체크하기'
                ),
                h('button', { class: 'remove_btn' }, '-')
            ),
        )
    )
)

const realDom = createElement(nodes);

const root = document.body.querySelector('#root');
const btn = root.querySelector('button');
btn.addEventListener('click', ()=>{
    window.performance.mark("VDOM click event")
    return root.appendChild(realDom)
})
