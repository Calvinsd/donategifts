import Agency from '../models/Agency';
import User from '../models/User';

export default class AgencyRepository {
	private agencyModel: typeof Agency;

	constructor() {
		this.agencyModel = Agency;
	}

	async getAgencyByUserId(userId: string) {
		return await this.agencyModel.findOne({ accountManager: userId }).lean().exec();
	}

	async getAgencyByName(agencyName: string) {
		try {
			return await this.agencyModel
				.findOne({ name: agencyName })
				.populate<{ accountManager: User }>('accountManager')
				.lean()
				.exec();
		} catch (error) {
			throw new Error(`Failed to get Agency: ${error}`);
		}
	}

	async createNewAgency(agencyParams: Agency) {
		try {
			return await this.agencyModel.create(agencyParams);
		} catch (error) {
			throw new Error(`Failed to create Agency: ${error}`);
		}
	}

	async verifyAgency(agencyId: string) {
		try {
			return await this.agencyModel
				.findOneAndUpdate({ _id: agencyId }, { $set: { isVerified: true } }, { new: true })
				.populate<{ accountManager: User }>('accountManager')
				.lean()
				.exec();
		} catch (error) {
			throw new Error(`Failed to verify Agency: ${error}`);
		}
	}

	async getVerifiedAgencies() {
		try {
			return await this.agencyModel.find({ isVerified: true }).lean().exec();
		} catch (error) {
			throw new Error(`Failed to get verified Agencies: ${error}`);
		}
	}

	async getUnverifiedAgencies() {
		try {
			return await this.agencyModel.find({ isVerified: false }).lean().exec();
		} catch (error) {
			throw new Error(`Failed to get unverified Agencies: ${error}`);
		}
	}

	async updateAgency(id: string, agencyFields: Partial<Agency>) {
		try {
			return await this.agencyModel
				.updateOne({ accountManager: id }, { $set: { ...agencyFields } })
				.lean()
				.exec();
		} catch (error) {
			throw new Error(`Failed to update agency details: ${error}`);
		}
	}
}
