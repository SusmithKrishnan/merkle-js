const { TestScheduler } = require('jest')
const Merkle = require('../merkle')
var merkle = new Merkle(['a', 'b', 'c', 'd'])

test('Get root', () => {
	expect(merkle.getRoot('hex')).toBe("14ede5e8e97ad9372327728f5099b95604a39593cac3bd38a343ad76205213e7")
})

test('Get nodes', () => {
	expect(merkle.getNodes()).toBe(3)
})

test('Get levels', () => {
	expect(merkle.getLevels()).toBe(3)
})

test('Get depth', () => {
	expect(merkle.getDepth()).toBe(2)
})

test('Get levels', () => {
	expect(merkle.getLevel(1, 'hex')).toEqual(["e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a", "bffe0b34dba16bc6fac17c08bac55d676cded5a4ade41fe2c9924a5dde8f3e5b"])
})
test('Get full tree', () => {
	expect(merkle.getFullTree('hex'))
		.toEqual(
			[
				[
					'14ede5e8e97ad9372327728f5099b95604a39593cac3bd38a343ad76205213e7'
				],
				[
					'e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a',
					'bffe0b34dba16bc6fac17c08bac55d676cded5a4ade41fe2c9924a5dde8f3e5b'
				],
				[
					'ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
					'3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
					'2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6',
					'18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4'
				]
			]
		)
})
