let callback: (el: HTMLElement[]) => void;

function containsAOSNode(nodes: HTMLElement[] | HTMLCollection) {
  let i: number;
  let currentNode: HTMLElement;
  let result: boolean;

  for (i = 0; i < nodes.length; i += 1) {
    currentNode = nodes[i] as HTMLElement;

    if (currentNode.dataset && currentNode.dataset.cursor) {
      return [currentNode];
    }

    result = currentNode.children && !!containsAOSNode(currentNode.children);

    if (result) {
      return currentNode.children;
    }
  }

  return false;
}

function check(mutations: MutationRecord[]) {
  if (!mutations) return;

  mutations.forEach((mutation): void | null => {
    const addedNodes = Array.prototype.slice.call(mutation.addedNodes) as HTMLElement[];
    const removedNodes = Array.prototype.slice.call(mutation.removedNodes) as HTMLElement[];
    const allNodes = addedNodes.concat(removedNodes);
    const current = containsAOSNode(allNodes);

    if (current && callback) {
      // eslint-disable-next-line
      return callback(current as HTMLElement[]);
      // return;
    }

    return null;
  });
}

function getMutationObserver() {
  return (
    window.MutationObserver ||
    // @ts-ignore
    window.WebKitMutationObserver ||
    // @ts-ignore
    window.MozMutationObserver
  );
}

function isSupported() {
  return !!getMutationObserver();
}

function ready(_selector: string, fn: (el: HTMLElement[]) => void) {
  const doc = window.document;
  const MutationObserver = getMutationObserver();

  const observer = new MutationObserver(check);
  callback = fn;

  observer.observe(doc.documentElement, {
    childList: true,
    subtree: true,
    // removedNodes: true
  });
}

export default { isSupported, ready };
