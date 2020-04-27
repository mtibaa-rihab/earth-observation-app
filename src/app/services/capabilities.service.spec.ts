import { capabilitiesService } from './capabilities.service';
import { HttpClient } from '@angular/common/http';
import { cold } from 'jasmine-marbles';
import { apiMock, expectedMappedCapability } from './apiResponseMock';

describe('capabilities service', () => {
    let service: capabilitiesService;

    it('should call get http method and return expected response', () => {
        // Arrange
        const httpClientStub = jasmine.createSpyObj<HttpClient>('http', ['get']);
        httpClientStub.get.and.returnValue(cold('a', { a: apiMock }));

        let service: capabilitiesService;
        service = new capabilitiesService(httpClientStub);

        // Act
        const mappedResponse = service.get();

        // Expect
        expect(httpClientStub.get).toHaveBeenCalled();
        expect(mappedResponse).toBeObservable(cold('a', { a: expectedMappedCapability }));
    });
});
