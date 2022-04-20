import json
import numpy as np

with open ('/tmp2/b08902047/cj/models/Gym.tri', mode='r', encoding='utf-8') as f:
    
    lines = f.readlines()
    n = len(lines) // 5 * 3
    fcs = np.array([])
    bcs = np.array([])
    vps = np.array([])
    vns = np.array([])
    tline = None
    for i, e in enumerate(lines):
        if i % 5 == 0:
            continue
        if i % 5 == 1:
            tline = e.split()
            fc, bc = np.array(tline[:3]).astype(np.float) / float(255), np.array(tline[-3:]).astype(np.float) / float(255)
            fcs = np.concatenate([fcs, np.repeat(fc, 3)])
            bcs = np.concatenate([bcs, np.repeat(bc, 3)])
        else:
            tline = e.split()
            fc, bc = np.array(tline[:3]).astype(np.float), np.array(tline[-3:]).astype(np.float)
            vps = np.concatenate([vps, fc])
            vns = np.concatenate([vns, bc])

    vps /= np.max(np.abs(vps))

d = {'vertexPositions': vps.tolist(), 'vertexNormals': vns.tolist(),
         'vertexFrontcolors': fcs.tolist(), 'vertexBackcolors': bcs.tolist()}

with open('model/F1.json', 'w') as f:
    json.dump(d, f)
